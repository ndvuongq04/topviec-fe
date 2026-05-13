import type { CvOnlineData } from '@/types/cvOnline.types'

type RecordValue = Record<string, unknown>

function escapeHtml(value: unknown) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function renderCollection(template: string, section: string, items: unknown[]) {
    const pattern = new RegExp(`{{#${section}}}([\\s\\S]*?){{\\/${section}}}`, 'g')

    return template.replace(pattern, (_, block: string) => {
        if (!Array.isArray(items) || items.length === 0) {
            return ''
        }

        return items
            .map((item) => {
                if (typeof item === 'string') {
                    return block.replace(/{{value}}/g, escapeHtml(item))
                }

                const record = (item ?? {}) as RecordValue
                return block.replace(/{{(\w+)}}/g, (_match: string, key: string) => {
                    return escapeHtml(record[key])
                })
            })
            .join('')
    })
}

export function renderCvTemplateHtml(templateHtml: string, data: CvOnlineData) {
    let output = templateHtml

    output = renderCollection(output, 'experiences', data.experiences)
    output = renderCollection(output, 'educations', data.educations)
    output = renderCollection(output, 'skills', data.skills)
    output = renderCollection(output, 'certifications', data.certifications)
    output = renderCollection(output, 'languages', data.languages)

    output = output.replace(/{{(\w+)}}/g, (_match: string, key: keyof CvOnlineData) => {
        const value = data[key]
        if (Array.isArray(value)) {
            return ''
        }
        return escapeHtml(value)
    })

    return output
}

export function buildCvPreviewDocument(templateHtml: string, templateCss: string, data: CvOnlineData) {
    const renderedHtml = renderCvTemplateHtml(templateHtml, data)
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${templateCss}</style>
  </head>
  <body>${renderedHtml}</body>
</html>`
}
