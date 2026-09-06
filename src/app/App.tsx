import { NotificationProvider } from "./context/NotificationContext"
import QueryProvider from "./providers/QueryProvider"
import { RouterProvider } from "./providers/RouterProvider"

function App() {
  

  return (
    
<NotificationProvider>
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
</NotificationProvider>
    
  )
}

export default App
