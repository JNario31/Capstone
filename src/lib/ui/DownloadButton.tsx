import { ArrowDownToLine} from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export function DownloadButton() {
  return (
    <Button variant="outline" 
    className="h-8 w-8">
      <ArrowDownToLine /> Download
    </Button>
  )
}