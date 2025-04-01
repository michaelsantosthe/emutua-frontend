// Inspired by react-hot-toast library
import { useState, useEffect, useCallback, ReactNode } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: ReactNode
  action?: ReactNode
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: ReactNode
  action?: ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type UseToast = {
  toasts: ToasterToast[]
  toast: (props: ToastProps) => void
  dismiss: (toastId?: string) => void
}

export const useToast = (): UseToast => {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  useEffect(() => {
    const timers = toasts.map((toast) => {
      const timer = setTimeout(() => {
        dismiss(toast.id)
      }, TOAST_REMOVE_DELAY)

      return { id: toast.id, timer }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer.timer))
    }
  }, [toasts])

  const toast = useCallback(
    ({ ...props }: ToastProps) => {
      const id = genId()

      setToasts((prevToasts) => {
        const newToast = {
          ...props,
          id,
        }

        const updatedToasts = [newToast, ...prevToasts].slice(0, TOAST_LIMIT)
        return updatedToasts
      })

      return id
    },
    [setToasts]
  )

  const dismiss = useCallback(
    (toastId?: string) => {
      if (toastId) {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== toastId)
        )
      } else {
        setToasts([])
      }
    },
    [setToasts]
  )

  return {
    toasts,
    toast,
    dismiss,
  }
}