import { Button, Link } from "ui"

export function BtnAddTrack() {
  return (
    <Link color="success" variant="button" href="/track/new">
      <Button color="success">Add Track</Button>
    </Link>
  )
}
