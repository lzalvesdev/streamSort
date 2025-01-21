'use client'; // Torna este componente interativo

import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>; // Função de exclusão passada como prop
}

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    setIsOpen(false);
    await onDelete(); // Chama a função de exclusão
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="absolute top-2 right-2">
          <AiOutlineDelete className="text-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este vídeo? Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
