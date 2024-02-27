import { render, screen, waitFor } from "@testing-library/react"; // DOM要素操作で使用
import userEvent from "@testing-library/user-event"; // ユーザー操作をシミュレート時に使用
import axios from "axios"; // axiosを利用したテストで使用
import { UserSearch } from "./UserSearch"; // テスト対象の画面

const user = userEvent.setup(); // userEventの初期化

jest.mock("axios"); // axiosをモック化
const mockAxios = jest.mocked(axios); // モック化したaxiosをセットしたオブジェクトを作成

describe("UserSearch", () => {
  beforeEach(() => {
    mockAxios.get.mockReset(); // モック関数の初期化
  });

  it("入力フィールドに入力した内容でAPIリクエストが送信される", async () => {
    const userInfo = { // mockAxios.getのレスポンスを定義
      id: 1,
      name: "Taro"
    };
    const resp = { data: userInfo }; // mockAxios.getのレスポンスを配列へセット
    mockAxios.get.mockResolvedValue(resp); // respをmockAxios.getのレスポンスとしてセット

    render(<UserSearch />); // UserSearchのDOM要素をレンダリング

    const input = screen.getByRole("textbox"); // textbox要素を取得
    await user.type(input, userInfo.name); // textboxへuserInfo.nameの値をセット(入力)
    const button = screen.getByRole("button"); // button要素を取得
    await user.click(button); // buttonクリック
    expect(mockAxios.get).toHaveBeenCalledWith( // mockAxios.getが{}内のAPIリクエストで実行されたかを確認
      `/api/users?query=${userInfo.name}`
    );
  });

  it("APIから取得したユーザー情報が画面に表示される", async () => {
    const userInfo = { // mockAxios.getのレスポンスを定義
      id: 1,
      name: "Taro"
    };
    const resp = { data: userInfo }; // mockAxios.getのレスポンスを配列へセット
    mockAxios.get.mockResolvedValue(resp); // respをmockAxios.getのレスポンスとしてセット

    render(<UserSearch />); // UserSearchのDOM要素をレンダリング

    const input = screen.getByRole("textbox"); //textbox要素を取得
    await user.type(input, userInfo.name); // textboxへuserInfo.nameの値をセット(入力)
    const button = screen.getByRole("button"); // button要素を取得
    await user.click(button); // buttonクリック
    await waitFor(() => expect(screen.getByText(userInfo.name)).toBeInTheDocument()); // textboxへuserInfo.nameが表示されたDOM要素が作成されるのを待つ
  });
});
