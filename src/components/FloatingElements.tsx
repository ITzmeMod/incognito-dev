
interface FloatingElementsProps {
  connectionInfo: any;
}

export const FloatingElements = ({ connectionInfo }: FloatingElementsProps) => (
  <>
    <div className="absolute top-20 left-10 text-green-400 font-mono text-xs opacity-50 animate-pulse">
      {">"} root@incognito:~$
    </div>
    <div className="absolute bottom-20 right-10 text-cyan-400 font-mono text-xs opacity-50 animate-pulse">
      {">"} connection_secure={connectionInfo?.isSecure ? 'true' : 'false'}
    </div>
  </>
);
