import Map from "src/Map";
import G from "src/models/G";

export default class vNode {
  tag: string
  id: string
  name: string
  parent: Map | G
  constructor(tag: string) {
    this.tag = tag
  }
}