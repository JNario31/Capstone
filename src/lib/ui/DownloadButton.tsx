import { ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadButtonProps } from "@/app/types/misc";


export function DownloadButton({building}: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:4000/export/${building}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${building}_sensor_data.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <Button variant="outline" className="h-8 w-8" onClick={handleDownload}>
      <ArrowDownToLine /> Download
    </Button>
  );
}
