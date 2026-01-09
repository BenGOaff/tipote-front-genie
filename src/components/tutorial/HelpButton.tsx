import { useState } from "react";
import { HelpCircle, Book, Mail, Youtube, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function HelpButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <a
              href="https://help.tipote.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Book className="w-4 h-4" />
              Centre d'aide
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href="https://youtube.com/@tipote"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              Tutoriels vidéo
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="mailto:hello@tipote.com"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              Contact support
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
