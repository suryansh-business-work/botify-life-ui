import ChatTopPannel from "../../ChatTopPannel";
import MCPClientWithChatGPT from "./mcp/MCPClientWithChatGPT";

const ChatLab = () => {
  return (
    <section className="chat-lab">
      <ChatTopPannel />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-12">
            <MCPClientWithChatGPT />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatLab;
