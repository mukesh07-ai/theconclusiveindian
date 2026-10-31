-- ==============================================================================
-- The Conclusive Indian (द कन्क्लूसिव इंडियन)
-- Production Seed Data (Single Database Architecture)
-- Database: u738606952_theconclusive
-- ==============================================================================

USE `u738606952_theconclusive`;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. SEED ROLES
INSERT INTO `roles` (`name`, `description`) VALUES
('super_admin', 'Super Administrator with unrestricted platform governance and system settings access'),
('editor_in_chief', 'Chief Editor with top-level editorial control, lead curation and final approvals'),
('editor', 'Editorial staff member managing article publishing, drafts, and taxonomy'),
('author', 'Contributing columnist and senior writer with draft and personal article rights'),
('reporter', 'Field reporter submitting regional news drafts for editorial review'),
('moderator', 'Grievance and reader feedback moderator under IT Rules 2021'),
('reader', 'Registered verified platform reader')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 2. SEED DEFAULT USERS (Bcrypt Hashed Passwords)
-- Passwords:
-- admin@theconclusiveindian.in  -> Admin@TCI2026!
-- editor@theconclusiveindian.in -> Editor@TCI2026!
-- author@theconclusiveindian.in -> Author@TCI2026!
INSERT INTO `users` (`id`, `email`, `hashed_password`, `full_name`, `is_active`) VALUES
('usr-admin-001', 'admin@theconclusiveindian.in', '$2b$12$Z4ochPck7tSLpJAheiVaK.4uhRK.0McBWMesz4szzOAS0a6ALXjO2', 'मुख्य प्रशासक (Super Admin)', 1),
('usr-editor-001', 'editor@theconclusiveindian.in', '$2b$12$0.iQUVc0uLYdZknSprchTeSayH6yGThbGmTnNwtMPxwvd6lxuGjGK', 'संपादकीय मंडल (Chief Editor)', 1),
('usr-author-001', 'author@theconclusiveindian.in', '$2b$12$Su.rpmzhf7RqsKMe3fmZteJC0fNs88Ta7U5RO4320tQp35oMywQ4G', 'वरिष्ठ संवाददाता (Senior Author)', 1)
ON DUPLICATE KEY UPDATE `hashed_password` = VALUES(`hashed_password`), `full_name` = VALUES(`full_name`), `is_active` = VALUES(`is_active`);

-- Assign User Roles
INSERT INTO `user_roles` (`user_id`, `role_name`) VALUES
('usr-admin-001', 'super_admin'),
('usr-admin-001', 'editor'),
('usr-editor-001', 'editor'),
('usr-author-001', 'author')
ON DUPLICATE KEY UPDATE `role_name` = VALUES(`role_name`);

-- 3. SEED AUTHORS
INSERT INTO `authors` (`id`, `name`, `english_name`, `slug`, `role`, `bio`, `avatar`, `twitter`, `email`) VALUES
('auth-raghavendra', 'राघवेंद्र शुक्ल', 'Raghavendra Shukla', 'raghavendra-shukla', 'विशेष संवाददाता (पर्यावरण एवं वन्यजीव)', 'दो दशकों से चंबल घाटी, वन्यजीव संरक्षण और हिमालयी पारिस्थितिकी पर खोजी पत्रकारिता।', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', '@raghav_tci', 'raghavendra@theconclusiveindian.in'),
('auth-meenakshi', 'मीनाक्षी कंडवाल', 'Meenakshi Kandwal', 'meenakshi-kandwal', 'वरिष्ठ पत्रकार (उत्तराखंड ब्यूरो)', 'उत्तराखंड की सामाजिक-राजनीतिक हलचलों, भू-कानून और सांस्कृतिक धरोहरों पर निरंतर लेखन।', 'https://images.unsplash.com/photo-1580489944761-15a19d654956', '@meenakshi_tci', 'meenakshi@theconclusiveindian.in'),
('auth-alok', 'आलोक शर्मा', 'Alok Sharma', 'alok-sharma', 'रणनीतिक विश्लेषक (राष्ट्रीय सुरक्षा)', 'राष्ट्रीय सुरक्षा, भू-राजनीति और भारतीय विदेश नीति के विशेषज्ञ स्तंभकार।', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', '@alok_tci', 'alok@theconclusiveindian.in'),
('auth-priya', 'प्रिया सिंह', 'Priya Singh', 'priya-singh', 'राजनीतिक संपादक', 'संसदीय कार्यवाही, राष्ट्रीय राजनीति और चुनावी रणनीतियों की वरिष्ठ समीक्षक।', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', '@priyasingh_tci', 'priya@theconclusiveindian.in')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `role` = VALUES(`role`), `bio` = VALUES(`bio`);

-- 4. SEED CATEGORIES (All 12 National News Categories)
INSERT INTO `categories` (`id`, `name`, `english_name`, `slug`, `description`, `color`, `display_order`, `is_active`) VALUES
('cat-world', 'विदेश', 'World', 'world', 'अंतरराष्ट्रीय कूटनीति, वैश्विक घटनाएं और भारत से जुड़े मामले', '#1E3A8A', 1, 1),
('cat-politics', 'राजनीति', 'Politics', 'politics', 'संसद, चुनाव, राजनीतिक दल और रणनीतिक विश्लेषण', '#DC2626', 2, 1),
('cat-entertainment', 'मनोरंजन', 'Entertainment', 'entertainment', 'सिनेमा, ओटीटी, कला, संगीत और समीक्षाएं', '#D97706', 3, 1),
('cat-sports', 'खेल', 'Sports', 'sports', 'क्रिकेट, ओलंपिक, राष्ट्रीय खेल और युवा प्रतिभाएं', '#059669', 4, 1),
('cat-business', 'व्यापार', 'Business', 'business', 'अर्थव्यवस्था, शेयर बाज़ार, बैंकिंग और उद्योग जगत', '#2563EB', 5, 1),
('cat-technology', 'प्रौद्योगिकी', 'Technology', 'technology', 'एआई, डिजिटल इंडिया, गैजेट्स और साइबर सुरक्षा', '#7C3AED', 6, 1),
('cat-lifestyle', 'जीवनशैली', 'Lifestyle', 'lifestyle', 'स्वास्थ्य, योग, पर्यटन, खान-पान और संस्कृति', '#DB2777', 7, 1),
('cat-opinion', 'विचार', 'Opinion', 'opinion', 'प्रमुख बुद्धिजीवियों और संपादकों के वैचारिक लेख', '#4B5563', 8, 1),
('cat-national', 'देश', 'National', 'national', 'राष्ट्रीय महत्व के बड़े समाचार और जनहित के मुद्दे', '#1D4ED8', 9, 1),
('cat-crime', 'अपराध', 'Crime', 'crime', 'न्यायालय, कानून प्रवर्तन और आपराधिक जांच रिपोर्ट', '#991B1B', 10, 1),
('cat-education', 'शिक्षा', 'Education', 'education', 'कैरियर, प्रतियोगी परीक्षाएं, विश्वविद्यालय और युवा', '#0D9488', 11, 1),
('cat-agriculture', 'कृषि', 'Agriculture', 'agriculture', 'किसान कल्याण, फसल, मौसम और ग्रामीण भारत की आवाज़', '#15803D', 12, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `display_order` = VALUES(`display_order`), `is_active` = VALUES(`is_active`);

-- 5. SEED TAGS
INSERT INTO `tags` (`id`, `name`, `slug`, `usage_count`, `is_trending`) VALUES
('tag-chambal', '#चंबल_सेंचुरी', 'चंबल_सेंचुरी', 28, 1),
('tag-doval', '#अजीत_डोभाल', 'अजीत_डोभाल', 45, 1),
('tag-bhookanoon', '#उत्तराखंड_भू_कानून', 'उत्तराखंड_भू_कानून', 62, 1),
('tag-budget', '#बजट_2026', 'बजट_2026', 84, 1),
('tag-viksit', '#विकसित_भारत', 'विकसित_भारत', 95, 1),
('tag-interview', '#विशेष_साक्षात्कार', 'विशेष_साक्षात्कार', 36, 0),
('tag-ground', '#ग्राउंड_रिपोर्ट', 'ग्राउंड_रिपोर्ट', 51, 1)
ON DUPLICATE KEY UPDATE `usage_count` = VALUES(`usage_count`), `is_trending` = VALUES(`is_trending`);

-- 6. SEED ARTICLES
INSERT INTO `articles` (`id`, `title`, `english_title`, `slug`, `excerpt`, `content`, `featured_image`, `image_alt`, `image_caption`, `image_credit`, `category_slug`, `category_name`, `author_slug`, `author_name`, `author_role`, `author_avatar`, `status`, `tags_csv`, `is_breaking`, `is_featured`, `is_trending`, `view_count`, `read_time_minutes`, `published_at`) VALUES
('art-chambal-revival', 'चंबल अभयारण्य का कायाकल्प: घड़ियाल और डॉल्फिन संरक्षण में भारत की ऐतिहासिक उपलब्धि', 'Chambal Sanctuary Revival Report', 'chambal-revival-gharial-dolphin-sanctuary-report', 'राष्ट्रीय चंबल अभयारण्य में लुप्तप्राय घड़ियालों और गंगा डॉल्फिन की संख्या में रिकॉर्ड बढ़ोतरी। स्थानीय समुदायों और वन विभाग के संयुक्त प्रयासों से नदी पारिस्थितिकी को मिला नया जीवन।', 'राष्ट्रीय चंबल अभयारण्य देश में मीठे पानी के जलीय जीवों के संरक्षण का सबसे बड़ा केंद्र बनकर उभरा है। ताज़ा वैज्ञानिक सर्वेक्षण के अनुसार, चंबल नदी में घड़ियालों की संख्या 2,400 के ऐतिहासिक आंकड़े को पार कर गई है, जबकि गंगा डॉल्फिन की संख्या में भी 28% की उल्लेखनीय वृद्धि दर्ज की गई है।\n\nसख्त निगरानी, अवैध बालू खनन पर अंकुश और स्थानीय ग्रामीणों की सहभागिता ने इस दुर्लभ नदी तंत्र को पुनर्स्थापित करने में महत्वपूर्ण भूमिका निभाई है। वन विभाग के अधिकारियों का कहना है कि यह मॉडल पूरे देश के नदी अभयारण्यों के लिए अनुकरणीय है।', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa', 'चंबल नदी में घड़ियाल संरक्षण', 'राष्ट्रीय चंबल अभयारण्य में संरक्षित जलीय जीव', 'द कन्क्लूसिव इंडियन / राघवेंद्र शुक्ल', 'national', 'देश', 'raghavendra-shukla', 'राघवेंद्र शुक्ल', 'विशेष संवाददाता (पर्यावरण)', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', 'published', '#चंबल_सेंचुरी,#ग्राउंड_रिपोर्ट,#राष्ट्रीय', 0, 1, 1, 4850, 5, '2026-03-20 09:30:00'),

('art-ajit-doval-legacy', 'रणनीतिक दूरदर्शिता और राष्ट्रीय सुरक्षा: एनएसए अजीत डोभाल की कार्यशैली का व्यापक विश्लेषण', 'NSA Ajit Doval Strategic Security Doctrine', 'ajit-doval-national-security-strategic-legacy', 'भारत के राष्ट्रीय सुरक्षा ढांचे में पिछले एक दशक में आए क्रांतिकारी बदलाव और डिफेंस डिप्लोमेसी में अजीत डोभाल के निर्णयों का एक विशेष सामरिक आकलन।', 'भारत की सामरिक नीति में पिछले एक दशक में जो आक्रामक रक्षात्मक रुख (Defensive Offense) देखा गया है, उसके केंद्र में राष्ट्रीय सुरक्षा सलाहकार अजीत डोभाल की दृष्टि रही है। सीमा पार आतंकवाद से निपटने से लेकर उत्तरी सीमाओं पर रणनीतिक बुनियादी ढांचे के विकास तक, भारत की प्रतिक्रिया त्वरित और निर्णायक रही है।\n\nअंतरराष्ट्रीय कूटनीति में भी क्वाड और ब्रिक्स जैसे बहुपक्षीय मंचों पर भारत ने अपने सुरक्षा हितों को सर्वोपरि रखा है। इस विशेष रिपोर्ट में जानिए भारत के सुरक्षा चक्रव्यूह की इनसाइड स्टोरी।', 'https://images.unsplash.com/photo-1541872703-74c5e44368f9', 'राष्ट्रीय सुरक्षा भवन नई दिल्ली', 'रणनीतिक कूटनीति का केंद्र', 'पीआईबी / सुरक्षा प्रभाग', 'world', 'विदेश', 'alok-sharma', 'आलोक शर्मा', 'रणनीतिक विश्लेषक', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', 'published', '#अजीत_डोभाल,#रणनीति,#विदेश', 0, 1, 1, 7200, 6, '2026-03-21 11:15:00'),

('art-darshan-bharti-strike', 'उत्तराखंड भू-कानून और जनआंदोलन: स्वामी दर्शन भारती के 21 दिवसीय आमरण अनशन का धरातलीय सच', 'Swami Darshan Bharti 21-Day Hunger Strike', 'swami-darshan-bharti-21-day-hunger-strike-uttarakhand', 'हिमालयी राज्य में मूल निवास प्रमाण पत्र और कड़े भू-कानून की मांग को लेकर जनाक्रोश चरम पर। अनशन के 21वें दिन शासन-प्रशासन के बीच बढ़ी हलचल।', 'देवभूमि उत्तराखंड में कृषि भूमि की अनियंत्रित खरीद-फरोख्त पर रोक लगाने और हिमाचल प्रदेश की तर्ज पर सख्त भू-कानून लागू करने की मांग ने व्यापक जनआंदोलन का रूप ले लिया है। स्वामी दर्शन भारती द्वारा शुरू किए गए आमरण अनशन को राज्यभर के युवाओं, मातृशक्ति और पूर्व सैनिकों का भारी समर्थन मिल रहा है।\n\nसरकार द्वारा गठित उच्चस्तरीय समिति की सिफारिशों और आंदोलनकारियों की मूल मांगों के बीच का गतिरोध गहराता जा रहा है। हमारी ग्राउंड रिपोर्ट बताती है कि पहाड़ की अस्मिता का यह सवाल अब चुनावी राजनीति से कहीं बड़ा हो चुका है।', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 'उत्तराखंड हिमालयी घाटी', 'भू-कानून आंदोलन का केंद्र', 'द कन्क्लूसिव इंडियन ब्यूरो', 'politics', 'राजनीति', 'meenakshi-kandwal', 'मीनाक्षी कंडवाल', 'वरिष्ठ पत्रकार', 'https://images.unsplash.com/photo-1580489944761-15a19d654956', 'published', '#उत्तराखंड_भू_कानून,#जनांदोलन', 1, 0, 1, 3950, 4, '2026-03-21 14:00:00')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `content` = VALUES(`content`), `view_count` = VALUES(`view_count`);

-- 7. SEED BREAKING NEWS TICKER
INSERT INTO `breaking_news` (`id`, `title`, `slug`, `category`, `timestamp_text`, `is_urgent`, `is_active`) VALUES
('bn-001', 'संसद का बजट सत्र: लोकसभा में विकसित भारत 2047 के संकल्प पत्र पर चर्चा जारी', 'parliament-budget-session-viksit-bharat', 'देश', 'अभी-अभी', 1, 1),
('bn-002', 'अंतरराष्ट्रीय मुद्रा कोष (IMF) ने भारत की विकास दर का अनुमान बढ़ाकर 7.2% किया', 'imf-india-gdp-growth-estimate-revision', 'व्यापार', '5 मिनट पहले', 1, 1),
('bn-003', 'मौसम विभाग की चेतावनी: उत्तर भारत के कई राज्यों में अगले 48 घंटों में बारिश और ओलावृष्टि की संभावना', 'imd-weather-alert-north-india-rain-hailstorm', 'मौसम', '12 मिनट पहले', 0, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `is_urgent` = VALUES(`is_urgent`);

-- 8. SEED HOMEPAGE SECTIONS
INSERT INTO `homepage_sections` (`id`, `section_type`, `title`, `display_order`, `is_enabled`, `config_json`) VALUES
('sec-hero', 'hero', 'मुख्य समाचार (Lead Stories)', 1, 1, '{"limit": 4, "layout": "featured_grid"}'),
('sec-breaking', 'breaking', 'लाइव ब्रेकिंग न्यूज़ टिकर', 2, 1, '{"scrollSpeed": 35, "pulseEffect": true}'),
('sec-latest', 'latest', 'ताज़ा ख़बरें (Latest News Stream)', 3, 1, '{"limit": 8, "showThumbnails": true}'),
('sec-videos', 'videos', 'वीडियो बुलेटिन एवं ख़ास साक्षात्कार', 4, 1, '{"limit": 4, "autoplay": false}'),
('sec-photos', 'photos', 'फोटो स्टोरीज़ (Visual Journalism)', 5, 1, '{"limit": 4}'),
('sec-opinions', 'opinion', 'संपादकीय एवं विचार (Editorial Voices)', 6, 1, '{"limit": 3}'),
('sec-regional', 'category', 'राज्य एवं प्रादेशिक हलचल', 7, 1, '{"category": "national", "limit": 6}')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `display_order` = VALUES(`display_order`), `is_enabled` = VALUES(`is_enabled`);

-- 9. SEED GLOBAL SITE SETTINGS
INSERT INTO `site_settings` (`key`, `value_json`) VALUES
('global_branding', '{
  "hindiName": "द कन्क्लूसिव इंडियन",
  "name": "The Conclusive Indian",
  "tagline": "निष्पक्ष • निर्भीक • निर्णायक",
  "englishTagline": "Fair, Fearless and Decisive Journalism",
  "contactEmail": "contact@theconclusiveindian.in",
  "editorialEmail": "editor@theconclusiveindian.in",
  "phone": "+91 11 4872 9000",
  "contactPhone": "+91 11 4872 9000",
  "address": {
    "street": "प्रेस एन्क्लेव, साकेत",
    "city": "नई दिल्ली",
    "state": "दिल्ली",
    "pincode": "110017",
    "country": "भारत"
  },
  "compliance": {
    "grievanceOfficer": {
      "name": "श्री आनंद मोहन त्रिवेदी",
      "designation": "शिकायत निवारण अधिकारी (Grievance Redressal Officer)",
      "email": "grievance@theconclusiveindian.in",
      "phone": "+91 11 4872 9015",
      "address": "द कन्क्लूसिव इंडियन, प्रेस एन्क्लेव, साकेत, नई दिल्ली - 110017"
    }
  },
  "socialLinks": {
    "twitter": "https://twitter.com/TheConclusiveIn",
    "facebook": "https://facebook.com/TheConclusiveIndian",
    "youtube": "https://youtube.com/@TheConclusiveIndian",
    "telegram": "https://t.me/TheConclusiveIndian"
  }
}')
ON DUPLICATE KEY UPDATE `value_json` = VALUES(`value_json`);

-- 10. SEED SAMPLE GRIEVANCE TICKET
INSERT INTO `contact_submissions` (`id`, `ticket_id`, `full_name`, `email`, `phone`, `category`, `subject`, `message`, `status`) VALUES
('sub-demo-001', 'TCI-20260321-789123', 'राजेश कुमार वर्मा', 'rajesh.verma@example.com', '+91 9876543210', 'editorial_correction', 'चंबल अभयारण्य रिपोर्ट में आंकड़ों का सत्यापन संदर्भ', 'महोदय, चंबल अभयारण्य रिपोर्ट में उल्लिखित घड़ियाल गणना के आंकड़े अत्यंत उत्साहवर्धक हैं। कृपया इसके स्रोत का आधिकारिक संदर्भ लेख के पाद-टिप्पणी में भी जोड़ें।', 'resolved')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

SET FOREIGN_KEY_CHECKS = 1;
