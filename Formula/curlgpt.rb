require "language/node"

class Curlgpt < Formula
  desc "ChatGPT in your favourite terminal"
  homepage "https://github.com/CurlGPT/CurlGPT"
  url "https://github.com/CurlGPT/CurlGPT/archive/refs/tags/v0.2.1.tar.gz"
  sha256 "2c75e434d9a666095f3babc94bad9b3a1e3c7f11563779783a322ccb5f49af61"
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
