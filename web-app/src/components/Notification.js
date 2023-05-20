import toast from "toasted-notes"

const Success = (message = "Profile updated!", title = "Success") => {
  toast.notify(message)
}

const Error = (
  message = "Something happened with your request",
  title = "Error"
) => {
  console.log("sdsd")
  toast.notify(message, { position: "bottom" })
}

// as of v3.3.0 react-notifications-component no longer
// uses default export
export default {
  Success,
  Error
}
