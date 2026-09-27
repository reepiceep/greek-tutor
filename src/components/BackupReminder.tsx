import { BACKUP_INTERVAL, downloadBackup, isIosTab, requestPersistence, usePersisted } from '../lib/backup'
import { updateSettings, useProgress } from '../lib/progress'
import { useNow } from '../lib/useNow'

/** Worth protecting once this many items have been practised. */
const MIN_ITEMS = 10

/**
 * On Home, now and then: progress is only in this browser, so back it up. Hidden when the browser has promised to keep
 * it, after a recent backup, and for two weeks after "Not now".
 */
export function BackupReminder() {
  const { items, settings } = useProgress()
  const persisted = usePersisted()
  const now = useNow()
  const practised = Object.keys(items).length
  const due = practised >= MIN_ITEMS
    && persisted !== true
    && (!settings.lastBackup || now - settings.lastBackup > BACKUP_INTERVAL)
    && (!settings.backupSnoozedUntil || now > settings.backupSnoozedUntil)
  if (!due) return null
  const ios = isIosTab()

  return (
    <div className="backup-reminder" role="note">
      <div>
        <strong>{settings.lastBackup ? 'Time for a fresh backup' : 'Keep your progress safe'}</strong>
        <p className="muted">
          {practised} items of progress are saved only in this browser{ios ? ', and Safari clears a site’s data after 7 days away' : ''}.
          {ios
            ? <> Download a copy, or add Theophilus to your Home Screen (Share, then <em>Add to Home Screen</em>) to keep it.</>
            : <> Download a copy to keep, or to move to another device.</>}
        </p>
      </div>
      <div className="actions left">
        <button className="primary" onClick={() => { downloadBackup(); requestPersistence() }}>Back up now</button>
        <button onClick={() => updateSettings({ backupSnoozedUntil: now + BACKUP_INTERVAL })}>Not now</button>
      </div>
    </div>
  )
}
