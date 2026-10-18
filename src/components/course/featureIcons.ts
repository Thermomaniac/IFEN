import {
  ArrowsClockwiseIcon,
  BooksIcon,
  CalendarDotsIcon,
  ClockIcon,
  HandPalmIcon,
  HeartIcon,
  LifebuoyIcon,
  StarIcon,
  UsersThreeIcon,
  VideoLessonIcon,
} from "@/components/icons";
import type { FeatureIcon } from "@/data/coursePage";

/** Icons a feature item can name, shared by FeatureGrid and FormatSteps. */
export const FEATURE_ICONS: Record<FeatureIcon, typeof ClockIcon> = {
  clock: ClockIcon,
  video: VideoLessonIcon,
  star: StarIcon,
  calendar: CalendarDotsIcon,
  refresh: ArrowsClockwiseIcon,
  hand: HandPalmIcon,
  heart: HeartIcon,
  lifebuoy: LifebuoyIcon,
  community: UsersThreeIcon,
  books: BooksIcon,
};
