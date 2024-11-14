export default function useIntersectionObserver() {
  const isSupported = 'IntersectionObserver' in window
  const observerMap = new Map()

  const observer = isSupported
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = observerMap.get(entry.target)
        if (callback) {
          callback(entry.isIntersecting)
        }
      })
    })
    : null

  const observe = (element, callback) => {
    if (element instanceof Element && observer) {
      observer.observe(element)
      observerMap.set(element, callback)
    } else {
      console.warn('Элемент для наблюдения отсутствует или некорректен:', element)
    }
  }

  const unobserve = (element) => {
    if (element instanceof Element && observer) {
      observer.unobserve(element)
      observerMap.delete(element)
    }
  }

  return { observe, unobserve }
}
