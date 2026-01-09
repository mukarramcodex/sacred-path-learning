import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Lock, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Lesson {
  title: string;
  duration: string;
  preview: boolean;
  videoUrl?: string;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  curriculum: Section[];
}

// Sample video URLs (these would come from database in production)
const sampleVideos: Record<string, string> = {
  "Welcome & Course Overview": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "The Arabic Alphabet - Part 1": "https://www.youtube.com/embed/dQw4w9WgXcQ",
};

export const VideoPreviewModal = ({
  isOpen,
  onClose,
  courseTitle,
  curriculum,
}: VideoPreviewModalProps) => {
  const [selectedLesson, setSelectedLesson] = useState<{
    title: string;
    sectionIndex: number;
    lessonIndex: number;
  } | null>(null);

  // Find first preview lesson on mount
  const getDefaultLesson = () => {
    for (let i = 0; i < curriculum.length; i++) {
      for (let j = 0; j < curriculum[i].lessons.length; j++) {
        if (curriculum[i].lessons[j].preview) {
          return {
            title: curriculum[i].lessons[j].title,
            sectionIndex: i,
            lessonIndex: j,
          };
        }
      }
    }
    return null;
  };

  const currentLesson = selectedLesson || getDefaultLesson();
  const currentLessonData = currentLesson
    ? curriculum[currentLesson.sectionIndex]?.lessons[currentLesson.lessonIndex]
    : null;

  const handleLessonClick = (
    lesson: Lesson,
    sectionIndex: number,
    lessonIndex: number
  ) => {
    if (lesson.preview) {
      setSelectedLesson({
        title: lesson.title,
        sectionIndex,
        lessonIndex,
      });
    }
  };

  const previewLessonsCount = curriculum.reduce(
    (acc, section) => acc + section.lessons.filter((l) => l.preview).length,
    0
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-6xl bg-background rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-foreground/80 text-primary-foreground hover:bg-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col lg:flex-row h-[80vh] max-h-[700px]">
            {/* Video Player */}
            <div className="flex-1 bg-foreground flex flex-col">
              <div className="aspect-video w-full bg-foreground relative">
                {currentLessonData?.preview ? (
                  <iframe
                    src={sampleVideos[currentLesson?.title || ""] || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentLesson?.title}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-primary-foreground font-medium">
                        This lesson is locked
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">
                        Enroll in the course to access all lessons
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Lesson Info */}
              <div className="p-4 bg-card border-t border-border">
                <h3 className="font-semibold text-foreground text-lg">
                  {currentLesson?.title || "Select a lesson"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentLessonData?.duration} •{" "}
                  {currentLessonData?.preview ? "Free Preview" : "Locked"}
                </p>
              </div>
            </div>

            {/* Playlist Sidebar */}
            <div className="w-full lg:w-96 bg-card border-l border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="font-bold text-foreground">{courseTitle}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {previewLessonsCount} preview lessons available
                </p>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2">
                  {curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                      <h4 className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {section.title}
                      </h4>
                      <ul className="space-y-1">
                        {section.lessons.map((lesson, lessonIndex) => {
                          const isSelected =
                            currentLesson?.sectionIndex === sectionIndex &&
                            currentLesson?.lessonIndex === lessonIndex;
                          const isPreview = lesson.preview;

                          return (
                            <li key={lessonIndex}>
                              <button
                                onClick={() =>
                                  handleLessonClick(lesson, sectionIndex, lessonIndex)
                                }
                                disabled={!isPreview}
                                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                                  isSelected
                                    ? "bg-primary/10 border border-primary/30"
                                    : isPreview
                                    ? "hover:bg-muted cursor-pointer"
                                    : "opacity-60 cursor-not-allowed"
                                }`}
                              >
                                <div
                                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : isPreview
                                      ? "bg-muted text-muted-foreground"
                                      : "bg-muted/50 text-muted-foreground/50"
                                  }`}
                                >
                                  {isPreview ? (
                                    isSelected ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <Play className="w-4 h-4" />
                                    )
                                  ) : (
                                    <Lock className="w-4 h-4" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-medium truncate ${
                                      isSelected
                                        ? "text-primary"
                                        : isPreview
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {lesson.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">
                                      {lesson.duration}
                                    </span>
                                    {isPreview && (
                                      <span className="text-xs text-primary font-medium">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Enroll CTA */}
              <div className="p-4 border-t border-border bg-muted/30">
                <Button className="w-full btn-hero" onClick={onClose}>
                  Enroll to Access All Lessons
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
