/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import addPlaylist from "@/app/api/playlists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loader";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';

export default function GerarPlaylistPage() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append('playlistId', youtubeLink);

    try {
      const { error } = await addPlaylist(formdata);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Playlist adicionada com sucesso!');
      router.push(`dashboard/meus-cursos/`);
    } catch (e: any) {
      toast.error(e.message || 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Coluna 1: Input para o link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">Adicionar Playlist</h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            Cole o link de uma playlist do YouTube para gerenciar seus vídeos de forma mais organizada.
          </p>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Loading />
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
              >
                <Input
                  name="playlistId"
                  value={youtubeLink}
                  placeholder="Cole o link da Playlist do YouTube"
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-4 w-full text-gray-700 transition-all ease-in-out transform hover:scale-105"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full"
              >
                <Button
                  className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform duration-300"
                  type="submit"
                >
                  Gerar Playlist
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Coluna 2: Explicação do que será feito */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-start space-y-4 text-center md:text-left"
        >
          <p className="text-lg text-gray-600">
            Ao adicionar o link da playlist, você poderá organizar os vídeos da playlist diretamente no seu dashboard.
          </p>
          <p className="text-gray-500">
            Depois de gerar sua playlist, basta acessar seu painel para gerenciar o conteúdo da forma que preferir.
          </p>
        </motion.div>
      </form>
    </div>

  );
}
