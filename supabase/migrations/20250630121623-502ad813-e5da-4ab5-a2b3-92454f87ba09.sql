
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roles table
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create scripts table for admin management
CREATE TABLE public.scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  youtube_link TEXT,
  download_link TEXT,
  status TEXT DEFAULT 'Working',
  upload_date DATE DEFAULT CURRENT_DATE,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_roles (admin only)
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for scripts
CREATE POLICY "Everyone can view scripts" ON public.scripts
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage scripts" ON public.scripts
  FOR ALL USING (public.is_admin(auth.uid()));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  
  -- Check if this is the admin email and assign admin role
  IF NEW.email = 'fortuitocliffordgwapo@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample scripts data
INSERT INTO public.scripts (title, description, image_url, youtube_link, download_link, status, click_count) VALUES
('Advanced Network Scanner', 'Comprehensive network discovery and vulnerability assessment tool with stealth capabilities and custom payload generation.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop', 'https://youtube.com/watch?v=dQw4w9WgXcQ', 'https://linkvertise.com/12345/advanced-scanner', 'Updated', 2847),
('SQL Injection Toolkit', 'Advanced SQL injection testing framework with automated detection and exploitation capabilities for ethical penetration testing.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop', 'https://youtube.com/watch?v=dQw4w9WgXcQ', 'https://work.ink/sql-toolkit-secure', 'Working', 1923),
('Web Application Fuzzer', 'Intelligent web application security testing tool with machine learning-based payload optimization and comprehensive reporting.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop', NULL, 'https://linkvertise.com/54321/web-fuzzer', 'Outdated', 756),
('Wireless Security Auditor', 'Complete wireless network security assessment suite with support for WPA3, enterprise networks, and IoT device testing.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop', 'https://youtube.com/watch?v=dQw4w9WgXcQ', 'https://work.ink/wireless-auditor', 'Updated', 3421),
('Social Engineering Toolkit', 'Comprehensive social engineering framework for security awareness training and authorized penetration testing scenarios.', 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=300&fit=crop', 'https://youtube.com/watch?v=dQw4w9WgXcQ', 'https://linkvertise.com/67890/social-toolkit', 'Working', 1567),
('Forensic Data Recovery', 'Advanced digital forensics tool for data recovery, analysis, and evidence collection with chain of custody documentation.', 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=300&fit=crop', NULL, 'https://work.ink/forensic-recovery', 'Updated', 892);
