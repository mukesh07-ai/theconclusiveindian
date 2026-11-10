from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class HomepageSectionDTO(BaseModel):
    id: str
    sectionType: str
    title: str
    displayOrder: int
    isEnabled: bool
    config: Optional[Dict[str, Any]] = None

class HomepageSectionCreate(BaseModel):
    id: Optional[str] = None
    sectionType: str
    title: str
    displayOrder: Optional[int] = 0
    isEnabled: Optional[bool] = True
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

class StaticPageCreate(BaseModel):
    slug: str
    title: str
    hindiTitle: str
    contentMarkdown: str
    metaDescription: Optional[str] = None

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

# --- Advertisement DTOs ---

class AdvertisementDTO(BaseModel):
    id: str
    title: str
    advertiserName: str
    destinationUrl: str
    creativeDesktopUrl: str
    creativeMobileUrl: Optional[str] = None
    placementPositions: List[str] = []
    adType: str = "image_banner"
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    priority: int = 1
    isActive: bool = True
    impressionsCount: int = 0
    clicksCount: int = 0
    ctr: float = 0.0
    createdAt: Optional[str] = None

class AdvertisementCreate(BaseModel):
    title: str
    advertiserName: str
    destinationUrl: str
    creativeDesktopUrl: str
    creativeMobileUrl: Optional[str] = None
    placementPositions: List[str]
    adType: Optional[str] = "image_banner"
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    priority: Optional[int] = 1
    isActive: Optional[bool] = True

class AdvertisementUpdate(BaseModel):
    title: Optional[str] = None
    advertiserName: Optional[str] = None
    destinationUrl: Optional[str] = None
    creativeDesktopUrl: Optional[str] = None
    creativeMobileUrl: Optional[str] = None
    placementPositions: Optional[List[str]] = None
    adType: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    priority: Optional[int] = None
    isActive: Optional[bool] = None

# --- URL Redirects DTOs ---

class UrlRedirectDTO(BaseModel):
    id: str
    sourcePath: str
    targetPath: str
    statusCode: int = 301
    createdAt: Optional[str] = None

class UrlRedirectCreate(BaseModel):
    sourcePath: str
    targetPath: str
    statusCode: Optional[int] = 301
