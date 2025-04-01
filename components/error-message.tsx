interface ErrorMessageProps {
    message: string | null
  }
  
  export function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null
  
    return <p className="text-red-500 text-sm mt-1">{message}</p>
  }
  
  