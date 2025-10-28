import { useI18n } from "vue-i18n"

export function timeSince(dateString: string): string {
  const { t } = useI18n({})

  const now = new Date()
  const past = new Date(dateString)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const years = Math.floor(seconds / (60 * 60 * 24 * 365))
  if (years > 0) return t('Helper.TimeSince.years', { n: years })

  const months = Math.floor(seconds / (60 * 60 * 24 * 30))
  if (months > 0) return t('Helper.TimeSince.months', { n: months })

  const weeks = Math.floor(seconds / (60 * 60 * 24 * 7))
  if (weeks > 0) return t('Helper.TimeSince.weeks', { n: weeks })

  const days = Math.floor(seconds / (60 * 60 * 24))
  if (days > 0) return t('Helper.TimeSince.days', { n: days })

  const hours = Math.floor(seconds / (60 * 60))
  if (hours > 0) return t('Helper.TimeSince.hours', { n: hours })

  const minutes = Math.floor(seconds / 60)
  if (minutes > 0) return t('Helper.TimeSince.minutes', { n: minutes })

  return t('Helper.TimeSince.seconds')
}
