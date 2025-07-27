"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  className = "",
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-32 w-32"
  };

  if (text) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className={`loading-spinner ${sizeClasses[size]}`} />
        <p className="text-muted-foreground">{text}</p>
      </div>
    );
  }

  return (
    <div className={`loading-spinner ${sizeClasses[size]} ${className}`} />
  );
}