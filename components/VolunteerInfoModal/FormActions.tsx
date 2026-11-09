import { Button } from '@/components/Button/Button';
import { cx } from '@/lib/cx';

/** "Annullér" og "Gem oplysninger" nederst til højre i en formular. "Gem" sender formularen. */
export function FormActions({ onCancel, className }: { onCancel: () => void; className?: string }) {
  return (
    <div className={cx('button-row', 'volunteer-info__actions', className)}>
      <Button bg="primary" variant="inverted" onClick={onCancel}>
        Annullér
      </Button>
      <Button type="submit">Gem oplysninger</Button>
    </div>
  );
}
