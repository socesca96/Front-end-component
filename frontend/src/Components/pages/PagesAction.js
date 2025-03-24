export const GO_TO_PAGE = 'GO_TO_PAGE'

export const goToPageAction = (pageName) => ({
    type: GO_TO_PAGE,
    payload: pageName
})