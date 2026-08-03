import { cn } from '@/utils/cn';

type TimelineProps = {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
};

const Timeline = (props: TimelineProps) => {
    const { className = '', children, ...rest } = props;

    return (
        <div className={cn(className)} {...rest}>
            <div className="timeline-icon bg-white">
                <div className="bg-primary flex h-1.5 w-1.5 rounded-full"></div>
            </div>
            {children}
        </div>
    );
};

export default Timeline;
