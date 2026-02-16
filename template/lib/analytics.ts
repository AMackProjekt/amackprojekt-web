// Track custom events for QR codes, shares, and other interactions
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
};

export const trackQRCodeView = (url: string) => {
  trackEvent("qr_code_view", {
    event_category: "engagement",
    event_label: url,
    value: 1,
  });
};

export const trackQRCodeScan = (url: string) => {
  trackEvent("qr_code_scan", {
    event_category: "conversion",
    event_label: url,
    value: 5,
  });
};

export const trackQRCodeDownload = (url: string) => {
  trackEvent("qr_code_download", {
    event_category: "engagement",
    event_label: url,
    value: 3,
  });
};

export const trackShare = (method: string, content: string) => {
  trackEvent("share", {
    method: method,
    content_type: content,
    event_category: "social",
  });
};

export const trackVideoPlay = (videoId: string, videoTitle: string) => {
  trackEvent("video_play", {
    event_category: "video",
    event_label: videoTitle,
    video_id: videoId,
  });
};

export const trackVideoComplete = (videoId: string, videoTitle: string) => {
  trackEvent("video_complete", {
    event_category: "video",
    event_label: videoTitle,
    video_id: videoId,
    value: 10,
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent("form_submit", {
    event_category: "engagement",
    form_name: formName,
    value: 5,
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", {
    event_category: "engagement",
    file_name: fileName,
    file_type: fileType,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent("external_link_click", {
    event_category: "engagement",
    event_label: linkText,
    external_url: url,
  });
};
