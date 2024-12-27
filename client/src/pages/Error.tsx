import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  code?: number;
  message?: string;
}

export default function Error({ code = 404, message = "Page not found" }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-neutral-900 dark:text-neutral-100">
          {code}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {message}
        </p>
    
          <Button variant="secondary" onClick={() => navigate('/')} >
            <span className='text-white'>Go to home</span>
          </Button>
     
      </div>
    </div>
  );
} 