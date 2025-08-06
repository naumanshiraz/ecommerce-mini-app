'use client'

import { Snackbar, Alert } from '@mui/material'
import { createContext, useCallback, useContext, useState } from 'react'

const SnackbarContext = createContext<(msg: string) => void>(() => {})

export const useSnackbar = () => useContext(SnackbarContext)

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  const showMessage = useCallback((msg: string) => {
    setMessage(msg)
    setOpen(true)
  }, [])

  return (
    <SnackbarContext.Provider value={showMessage}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpen(false)} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
