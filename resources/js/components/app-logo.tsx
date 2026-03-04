import { cn } from '@/lib/utils';

interface AppLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function AppLogo({ className, ...props }: AppLogoProps) {
    return (
        <>
            Logo
            {/* <img src='/logo.svg' alt="App Logo" className={cn("w-auto max-w-[150px] object-contain", className)} {...props} /> */}
        </>
    );
}