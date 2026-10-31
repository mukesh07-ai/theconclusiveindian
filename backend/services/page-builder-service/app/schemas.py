from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class HomepageSectionDTO(BaseModel):
    id: str
    sectionType: str
    title: str
    displayOrder: int
    isEnabled: bool
    config: Optional[Dict[str, Any]] = None

class HomepageSectionUpdate(BaseModel):
    title: Optional[str] = None
    displayOrder: Optional[int] = None
    isEnabled: Optional[bool] = None
    config: Optional[Dict[str, Any]] = None

class NavigationItemDTO(BaseModel):
    id: str
    menuLocation: str
    label: str
    href: str
    displayOrder: int
    isActive: bool

class NavigationUpdate(BaseModel):
    items: List[NavigationItemDTO]

class StaticPageDTO(BaseModel):
    slug: str
    title: str
    hindiTitle: str
    contentMarkdown: str
    metaDescription: Optional[str] = None
    updatedAt: Optional[str] = None

class StaticPageUpdate(BaseModel):
    title: Optional[str] = None
    hindiTitle: Optional[str] = None
    contentMarkdown: Optional[str] = None
    metaDescription: Optional[str] = None

class SiteConfigDTO(BaseModel):
    name: str
    hindiName: str
    tagline: str
    englishTagline: str
    description: str
    url: str
    editorialEmail: str
    contactEmail: str
    phone: str
    address: Dict[str, str]
    social: Dict[str, str]
    compliance: Dict[str, Any]
    businessVerification: Dict[str, Any]
