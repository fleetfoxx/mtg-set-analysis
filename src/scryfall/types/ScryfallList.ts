type ScryfallList<T> = {
  object: "list",
  has_more: boolean,
  next_page?: string,
  data: Array<T>
}

export default ScryfallList;