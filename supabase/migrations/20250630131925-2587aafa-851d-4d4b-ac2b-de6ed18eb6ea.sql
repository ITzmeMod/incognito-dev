
-- Insert your user profile if it doesn't exist
INSERT INTO public.profiles (id, email, full_name)
VALUES ('192edae9-cf09-4b2f-873a-e2c1d05b034a', 'fortuitocliffordgwapo@gmail.com', 'Clifford Admin')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  updated_at = NOW();

-- Ensure you have admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('192edae9-cf09-4b2f-873a-e2c1d05b034a', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Update the handle_new_user function to also check for your specific user ID
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
  
  -- Check if this is the admin email or user ID and assign admin role
  IF NEW.email = 'fortuitocliffordgwapo@gmail.com' OR NEW.id = '192edae9-cf09-4b2f-873a-e2c1d05b034a' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$$;
