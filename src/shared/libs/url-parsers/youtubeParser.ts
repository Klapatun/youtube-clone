interface YouTubeLinkInfo {
  id: string;
  type: 'video' | 'short' | 'playlist' | 'channel' | 'unknown';
  url: string;
}

/**
 * Парсит YouTube ссылку и извлекает из неё информацию
 * @param url - ссылка на YouTube
 * @returns объект с информацией о ссылке или null, если ссылка невалидная
 */
export function youtubeParser(url: string): YouTubeLinkInfo | null {
  try {
    const urlObj = new URL(url.trim());

    // Проверяем, что это действительно YouTube
    const validDomains = [
      'youtube.com',
      'www.youtube.com',
      'm.youtube.com',
      'music.youtube.com',
      'youtu.be',
      'www.youtu.be',
      'youtube-nocookie.com',
      'www.youtube-nocookie.com',
    ];

    if (!validDomains.includes(urlObj.hostname)) {
      return null;
    }

    let id = '';
    let type: YouTubeLinkInfo['type'] = 'unknown';

    // Обработка youtu.be коротких ссылок
    if (urlObj.hostname === 'youtu.be' || urlObj.hostname === 'www.youtu.be') {
      const path = urlObj.pathname.slice(1).split('/')[0];
      if (path) {
        id = path;
        type = path.length === 11 ? 'video' : 'unknown';
      }
    }
    // Обработка youtube.com ссылок
    else {
      const pathname = urlObj.pathname;

      // Видео (/watch?v=VIDEO_ID)
      if (pathname === '/watch') {
        id = urlObj.searchParams.get('v') || '';
        type = 'video';
      }
      // Shorts (/shorts/VIDEO_ID)
      else if (pathname.startsWith('/shorts/')) {
        id = pathname.split('/')[2] || '';
        type = 'short';
      }
      // Плейлист (/playlist?list=PLAYLIST_ID)
      else if (pathname === '/playlist') {
        id = urlObj.searchParams.get('list') || '';
        type = 'playlist';
      }
      // Канал (/channel/CHANNEL_ID или /c/CHANNEL_NAME или /@USERNAME)
      else if (
        pathname.startsWith('/channel/') ||
        pathname.startsWith('/c/') ||
        pathname.startsWith('/@')
      ) {
        id = pathname.split('/')[1] === '@'
          ? pathname.slice(2) // для @username
          : pathname.split('/')[2] || pathname.split('/')[1] || '';
        type = 'channel';
      }
      // Встроенное видео (/embed/VIDEO_ID)
      else if (pathname.startsWith('/embed/')) {
        id = pathname.split('/')[2] || '';
        type = 'video';
      }
      // Прямая ссылка на видео (/v/VIDEO_ID)
      else if (pathname.startsWith('/v/')) {
        id = pathname.split('/')[2] || '';
        type = 'video';
      }
    }

    // Валидация ID (базовая проверка)
    if (!id || id.length < 10) {
      return null;
    }

    return {
      id,
      type,
      url: url.trim(),
    };
  } catch {
    return null;
  }
}