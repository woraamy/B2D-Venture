
import { Bold, Italic, Underline, AlignLeft, AlignJustify, AlignCenter, AlignRight } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

  export default function ToolsBar() {
    return (
        <div>
            
            <div className="border-2 w-full rounded-md">
                <Toggle aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                 </Toggle>
                 <Toggle aria-label="Toggle italic">
                    <AlignJustify className="h-4 w-4"/>
                </Toggle>
                <Toggle aria-label="Toggle italic">
                    <AlignLeft className="h-4 w-4"/>
                </Toggle>
                <Toggle aria-label="Toggle italic">
                    <AlignCenter className="h-4 w-4"/>
                </Toggle>
                <Toggle aria-label="Toggle italic">
                    <AlignRight className="h-4 w-4"/>  
                </Toggle>
                <Toggle aria-label="Toggle italic">
                    <Underline className="h-4 w-4" />
                </Toggle>
                
                
            </div>
        </div>

    );
  }