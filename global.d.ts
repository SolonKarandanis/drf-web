type Messages = typeof import("./messages/en.json");
type GRMessages = typeof import("./messages/gr.json");

declare interface IntlMessages extends Messages,GRMessages{}