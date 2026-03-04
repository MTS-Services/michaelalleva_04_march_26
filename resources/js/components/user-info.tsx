import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();
    return (
        <>
            <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar_url || user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary text-white text-lg font-semibold ">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-base font-semibold text-card-foreground ">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-sm text-card-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
