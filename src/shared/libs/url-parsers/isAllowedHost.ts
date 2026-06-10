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

export const isAllowedHost = (url: URL, allowedDomains: string[] = validDomains) => {
    return allowedDomains.includes(url.hostname)
}