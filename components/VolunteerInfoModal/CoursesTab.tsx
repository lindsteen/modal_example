import { Button } from '@/components/Button/Button';
import { Heading } from '@/components/Heading/Heading';
import { InfoList } from '@/components/InfoList/InfoList';
import { Text } from '@/components/Text/Text';
import type { Course } from '@/lib/types';

export interface CoursesTabProps {
  courses: ReadonlyArray<Course>;
  onClose: () => void;
}

/** Fanen "Kurser". */
export function CoursesTab({ courses, onClose }: CoursesTabProps) {
  return (
    <>
      <Heading level={3} size="md" className="volunteer-info__section-title">
        Gennemførte kurser
      </Heading>
      {courses.length === 0 ? (
        <Text>Den frivillige har endnu ikke gennemført kurser i Mit Røde Kors.</Text>
      ) : (
        <InfoList items={courses.map((course) => ({ term: `${course.name}:`, value: course.completedDate }))} />
      )}
      <div className="button-row volunteer-info__actions">
        <Button size="sm" onClick={onClose}>
          Luk
        </Button>
      </div>
    </>
  );
}
