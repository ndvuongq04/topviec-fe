export type CvOnlineSupportedSection =
    | 'personal'
    | 'careerObjective'
    | 'experiences'
    | 'educations'
    | 'skills'
    | 'certifications'
    | 'languages'

export interface CvOnlineExperienceItem {
    id: string
    company: string
    role: string
    startDate: string
    endDate: string
    description: string
}

export interface CvOnlineEducationItem {
    id: string
    school: string
    degree: string
    startDate: string
    endDate: string
    description: string
}

export interface CvOnlineCertificationItem {
    id: string
    name: string
    issuer: string
    year: string
}

export interface CvOnlineLanguageItem {
    id: string
    name: string
    level: string
}

export interface CvOnlineData {
    fullName: string
    email: string
    phone: string
    address: string
    jobTitle: string
    careerObjective: string
    experiences: CvOnlineExperienceItem[]
    educations: CvOnlineEducationItem[]
    skills: string[]
    certifications: CvOnlineCertificationItem[]
    languages: CvOnlineLanguageItem[]
}

export interface CvTemplateSummary {
    id: number
    name: string
    slug: string
    thumbnail: string
    tags: string[]
    categories: string[]
    colors: string[]
    isNew: boolean
    language: 'vi' | 'en'
    supportedSections: CvOnlineSupportedSection[]
}

export interface CvTemplateDetail extends CvTemplateSummary {
    html: string
    css: string
    placeholderCatalog: string[]
}

export interface CvOnlineDraft {
    id: string
    templateId: number
    title: string
    data: CvOnlineData
    createdAt: string
    updatedAt: string
}
