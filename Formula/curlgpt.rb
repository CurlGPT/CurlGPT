require "language/node"

class Curlgpt < Formula
  desc "ChatGPT in your favourite terminal"
  homepage "https://github.com/CurlGPT/CurlGPT"
  url "https://github.com/CurlGPT/CurlGPT/releases/tag/v0.2.1"
  sha256 "8407fed2dff521a40e276da51462c421fb8d806f4feb8b5d5206c50b677cec8b"
  license "MIT"
  head "https://github.com/CurlGPT/CurlGPT.git", branch: "main"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    version = shell_output(bin/"curlgpt --version")
    assert_match "Version: 0.2.1", version
  end
end
