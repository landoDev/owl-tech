// NOTE: this is overkill as I thought I'd need it more than once. But will leave it here anyway.
const useAvailableYears = () => {
    return Array.from(
        {length: (new Date().getFullYear() - 1998)}, (_, i) => (new Date().getFullYear() - i).toString()
      )
}

export default useAvailableYears;