"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Image as ImageIcon, Download, Eye, Music, Pause } from 'lucide-react';
import type { GoogleDriveFile } from '../types';
import { getFileType, getFileIcon } from '../types';
import BackgroundAura from '../components/BackgroundAura';

// Ganti URL ini dengan file lagu yang Anda simpan di folder public
// Simpan lagu "Hindia - Everything You Are" sebagai "lagu.mp3" di folder public
const MUSIC_URL = "/everything-u-are.mp3";

export default function Gallery() {
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<GoogleDriveFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredFileId, setHoveredFileId] = useState<string | null>(null);
  
  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to play music on mount
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Volume 50%
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay prevented by browser, waiting for interaction:", err);
          setIsPlaying(false);
          
          // Add one-time click listener to start audio
          const startAudioOnClick = async () => {
            if (audioRef.current) {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
                document.removeEventListener('click', startAudioOnClick);
              } catch (e) {
                console.error("Play failed on click:", e);
              }
            }
          };
          document.addEventListener('click', startAudioOnClick);
        }
      }
    };
    
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Coba gunakan endpoint Pages Router sebagai fallback jika App Router bermasalah
        const res = await fetch('/api/drive-pages');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setFiles(data);
        setError(null);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setError(error instanceof Error ? error.message : "Gagal mengambil data dari Google Drive");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const isImage = (file: GoogleDriveFile) => file.mimeType.includes('image/');
  const isVideo = (file: GoogleDriveFile) => file.mimeType.includes('video/');
  const isPreviewable = (file: GoogleDriveFile) => isImage(file) || isVideo(file);

  return (
    <div className="min-h-screen text-zinc-200 selection:bg-zinc-700/50 overflow-hidden font-sans relative">
      
      <BackgroundAura />
      
      {/* Music Player Control */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <audio ref={audioRef} src={MUSIC_URL} loop autoPlay />
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`p-3 rounded-full backdrop-blur-md border border-zinc-500/20 shadow-xl transition-all ${
            isPlaying 
              ? 'bg-zinc-800/60 text-zinc-100 hover:bg-zinc-700/80' 
              : 'bg-black/40 text-zinc-400 hover:bg-black/60 hover:text-white'
          }`}
        >
          {isPlaying ? <Pause size={24} /> : <Music size={24} />}
        </motion.button>
      </div>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 z-10">
        {/* Header Section */}
        <header className="mb-20 sm:mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative inline-block"
          >
            <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-zinc-100 drop-shadow-2xl select-none mb-4">
              ANGKATAN 30
            </h1>
          </motion.div>
          
          {/* Subtitle - High Contrast */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mb-2" />
            <p className="text-lg sm:text-xl text-zinc-400 font-serif italic tracking-widest uppercase opacity-90">
              Our Journey • Our Memories • Our Story
            </p>
          </motion.div>
        </header>

        {/* Gallery Content */}

        {loading ? (
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 mx-auto">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="break-inside-avoid mb-4 bg-zinc-900/40 rounded-sm overflow-hidden border border-zinc-700/30 shadow-lg">
                <div className={`w-full bg-zinc-800/50 animate-pulse ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-video'}`} />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-zinc-800/50 rounded w-3/4 animate-pulse" />
                  <div className="h-2 bg-zinc-800/50 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-zinc-900/50 border border-red-500/30 rounded-lg p-6 sm:p-8 max-w-md w-full backdrop-blur-sm">
              <p className="text-red-400 font-serif font-bold mb-2 text-xl">⚠️ Error</p>
              <p className="text-zinc-300 text-sm mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded text-zinc-100 font-medium text-sm transition-all"
              >
                Retry
              </button>
            </div>
          </motion.div>
        ) : files.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20 sm:py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ImageIcon className="w-16 h-16 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-lg font-serif italic">No files found</p>
            <p className="text-zinc-500 text-sm mt-2">Add files to your Google Drive folder</p>
          </motion.div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 mx-auto">
            {files.map((file, index) => {
              const canPreview = isPreviewable(file);
              const fileType = getFileType(file.mimeType, file.name);
              const fileIcon = getFileIcon(file.mimeType, file.name);
              
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.8 }}
                  onHoverStart={() => setHoveredFileId(file.id)}
                  onHoverEnd={() => setHoveredFileId(null)}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-sm bg-zinc-900/40 border border-zinc-700/30 hover:border-zinc-500/30 cursor-pointer transition-all duration-500 shadow-lg hover:shadow-zinc-900/20"
                  onClick={() => canPreview && setSelectedFile(file)}
                >
                  {/* Content Layer */}
                  {isImage(file) ? (
                    <motion.img
                      src={file.thumbnailLink?.replace('=s220', '=s600') || ''}
                      alt={file.name}
                      className="w-full h-auto block transition-all duration-700"
                      animate={{ scale: hoveredFileId === file.id ? 1.05 : 1 }}
                      transition={{ duration: 0.7 }}
                      loading="lazy"
                    />
                  ) : isVideo(file) ? (
                    <div className="w-full aspect-video bg-zinc-800 flex items-center justify-center relative group-hover:bg-zinc-700 transition-colors">
                      <motion.div
                        animate={{ scale: hoveredFileId === file.id ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="z-10"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-zinc-500/50 group-hover:bg-zinc-500/20 transition-all">
                          <Play size={24} className="text-white fill-white ml-1" />
                        </div>
                      </motion.div>
                      {/* Video Thumbnail if available */}
                      {file.thumbnailLink && (
                        <img 
                          src={file.thumbnailLink.replace('=s220', '=s600')} 
                          alt={file.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-[3/4] bg-zinc-800 flex flex-col items-center justify-center p-6 relative overflow-hidden group-hover:bg-zinc-750 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/5" />
                      <motion.span 
                        className="text-5xl mb-4 relative z-10 drop-shadow-2xl text-zinc-400"
                        animate={{ scale: hoveredFileId === file.id ? 1.1 : 1, rotate: hoveredFileId === file.id ? 5 : 0 }}
                      >
                        {fileIcon}
                      </motion.span>
                      <span className="text-xs text-zinc-300 text-center font-serif italic px-2 relative z-10 break-words w-full line-clamp-2">
                        {file.name}
                      </span>
                    </div>
                  )}

                  {/* Overlay Gradient - Only visible on hover for cleaner look */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Hover Content */}
                  <AnimatePresence>
                    {hoveredFileId === file.id && (
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="transform translate-y-0 transition-transform duration-300">
                          {/* File Info */}
                          <div className="mb-3">
                            <p className="text-sm font-serif text-zinc-100 leading-tight line-clamp-2 mb-1 drop-shadow-md">{file.name}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800/80 text-zinc-300 border border-zinc-600 backdrop-blur-md">
                              {fileType}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            {canPreview && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedFile(file);
                                }}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-200 text-zinc-900 rounded-sm text-xs font-bold hover:bg-white transition-colors shadow-lg font-serif"
                              >
                                <Eye size={14} />
                                View
                              </motion.button>
                            )}
                            {file.webContentLink && (
                              <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={file.webContentLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-800 text-zinc-200 border border-zinc-600 rounded-sm text-xs font-bold hover:bg-zinc-700 transition-colors shadow-lg font-serif"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Download size={14} />
                                Get
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black/20 backdrop-blur-lg mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-800 rounded-sm opacity-80 border border-zinc-700" />
            <span className="font-serif font-bold text-sm tracking-wider text-zinc-500">GALLERY</span>
          </div>
          <p className="text-xs text-zinc-600 font-medium font-serif italic">
            Designed with <span className="text-zinc-500">♥</span> for Memories
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedFile(null)}
          >
            {/* Close Button */}
            <motion.button 
              className="absolute top-4 sm:top-8 right-4 sm:right-8 p-2 sm:p-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full transition-colors text-zinc-300 z-10 border border-zinc-700"
              onClick={() => setSelectedFile(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} />
            </motion.button>

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-4xl flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Display */}
              {isImage(selectedFile) ? (
                <motion.img 
                  src={selectedFile.thumbnailLink?.replace('=s220', '=s2000') || selectedFile.webContentLink}
                  alt={selectedFile.name}
                  className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl border border-zinc-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : isVideo(selectedFile) ? (
                <motion.video 
                  controls 
                  autoPlay 
                  className="max-w-full max-h-[70vh] rounded-sm shadow-2xl border border-zinc-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <source src={selectedFile.webContentLink} />
                </motion.video>
              ) : (
                <div className="bg-zinc-900 rounded-sm p-8 sm:p-12 text-center max-w-md border border-zinc-800">
                  <span className="text-6xl sm:text-8xl mb-4 block text-zinc-500">{getFileIcon(selectedFile.mimeType, selectedFile.name)}</span>
                  <p className="text-zinc-100 font-serif font-bold mb-2">{selectedFile.name}</p>
                  <p className="text-zinc-500 text-sm mb-6">{getFileType(selectedFile.mimeType, selectedFile.name)}</p>
                  {selectedFile.webContentLink && (
                    <a
                      href={selectedFile.webContentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-sm text-zinc-100 font-serif font-bold transition-all"
                    >
                      Download File
                    </a>
                  )}
                </div>
              )}

              {/* File Details */}
              <motion.div 
                className="text-center mt-4 max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-zinc-100 mb-2">{selectedFile.name}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-serif italic">
                  {getFileType(selectedFile.mimeType, selectedFile.name)} • {selectedFile.mimeType}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}