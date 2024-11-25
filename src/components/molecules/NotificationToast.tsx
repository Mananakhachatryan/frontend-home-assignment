import React from 'react'
import { ToastContainer, toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notifySuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, options)
}

export const notifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, options)
}

const NotificationToast: React.FC = () => {
  return <ToastContainer position="top-right" autoClose={3000} />
}

export default NotificationToast
