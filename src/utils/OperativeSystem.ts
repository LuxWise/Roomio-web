const OperativeSystem = () => {
  const userAgent = navigator.userAgent;

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "desconocido";
};

export default OperativeSystem;
