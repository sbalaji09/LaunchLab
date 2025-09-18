import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the frontend app
    router.push('/frontend/launch-lab/');
  }, [router]);

  return (
    <div>
      <h1>Redirecting to Launch Lab...</h1>
    </div>
  );
}
