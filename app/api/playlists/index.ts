/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth } from "@/auth";
import db from "@/lib/db";

interface PlaylistData {
  playlistId: string;
  userId: string;
}

interface PlaylistResult {
  data?: PlaylistData;
  error?: string;
}

export default async function addPlaylist(formdata: FormData):
  Promise<PlaylistResult> {
  const session = await auth();
  const textPlaylistId = formdata.get('playlistId');

  if (typeof textPlaylistId !== 'string') {
    return { error: 'O campo playlistId deve ser uma string' };
  }
  // Extrair o ID da playlist do link do YouTube
  const listMatch = textPlaylistId?.match(/[?&]list=([^&]+)/);
  const textValue = listMatch ? listMatch[1] : '';

  if (!textValue || textValue == "") {
    return { error: 'O campo playlistId é obrigatório' }
  }

  const playlistId: string = textValue.toString();
  const userEmail: string = String(session?.user?.email);

  try {
    // Verificar se a playlist já foi cadastrada para o usuário
    const existingPlaylist = await db.playlist.findFirst({
      where: {
        userId: userEmail,
        playlistId: playlistId,
      },
    });

    if (existingPlaylist) {
      return { error: 'Essa playlist já está cadastrada.' };
    }

    // Adiciona a playlist ao usuario
    const playlistData: PlaylistData = await db.playlist
      .create({
        data: {
          userId: userEmail,
          playlistId: playlistId,
        },
      });


    return { data: playlistData }
  } catch (error: any) {
    console.log(error.message)
    return { error: 'Erro ao adicionar playlist' };
  }
}
