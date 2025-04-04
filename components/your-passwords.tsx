"use client";
import { Copy, Key, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PasswordsProps {
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({ passwords }: { passwords: PasswordsProps[] }) {
  function copyUsername(username: string) {
    navigator.clipboard.writeText(username);
    toast.success("Username copied", {
      description: "Username copied to clipboard.",
    });
  }

  if (passwords.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <Key className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No passwords added yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first password to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Website</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passwords.map((password) => (
            <TableRow key={password.website}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2 ">
                  <div>
                    <div>{password.website}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[120px]">
                    {password.username}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyUsername(password.username)}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy username</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{password.password}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={`https://${password.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
