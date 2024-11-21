import React from 'react';
import { Building2, Store, User2, Lock, CreditCard, Table, Download, Edit2, Trash2, HelpCircle } from 'lucide-react';

export function Manual() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-indigo-600" />
          売上管理システム マニュアル
        </h1>

        {/* ログイン方法 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User2 className="w-6 h-6 text-indigo-600" />
            ログイン方法
          </h2>
          <div className="ml-8 space-y-4">
            <p className="text-gray-600">以下のアカウントでログインできます：</p>
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">ユーザーID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">パスワード</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">権限</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">tenantA</td>
                  <td className="px-6 py-4 text-sm text-gray-900">A</td>
                  <td className="px-6 py-4 text-sm text-gray-900">テナントA</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">tenantB</td>
                  <td className="px-6 py-4 text-sm text-gray-900">B</td>
                  <td className="px-6 py-4 text-sm text-gray-900">テナントB</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">tenantC</td>
                  <td className="px-6 py-4 text-sm text-gray-900">C</td>
                  <td className="px-6 py-4 text-sm text-gray-900">テナントC</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">admin</td>
                  <td className="px-6 py-4 text-sm text-gray-900">admin</td>
                  <td className="px-6 py-4 text-sm text-gray-900">管理者</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* テナント向け機能 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Store className="w-6 h-6 text-indigo-600" />
            テナント向け機能
          </h2>
          
          <div className="ml-8 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                売上入力
              </h3>
              <ul className="ml-6 list-disc text-gray-600 space-y-2">
                <li>年月を選択（デフォルトで当月が選択されています）</li>
                <li>売上金額を入力（数字のみ入力可能）</li>
                <li>同じ月の売上は重複して登録できません</li>
                <li>入力内容を確認して「保存」ボタンをクリック</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Table className="w-5 h-5 text-indigo-600" />
                売上履歴の確認
              </h3>
              <ul className="ml-6 list-disc text-gray-600 space-y-2">
                <li>過去の売上データを一覧表示</li>
                <li>月次の売上推移をグラフで確認可能</li>
                <li>売上データは新しい順に表示されます</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 管理者向け機能 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            管理者向け機能
          </h2>
          
          <div className="ml-8 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Table className="w-5 h-5 text-indigo-600" />
                テナント一覧
              </h3>
              <ul className="ml-6 list-disc text-gray-600 space-y-2">
                <li>全テナントの今月の売上を一覧表示</li>
                <li>前月比を％で表示（増減を色で区別）</li>
                <li>各テナントの売上データの修正・削除が可能</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Download className="w-5 h-5 text-indigo-600" />
                データ出力
              </h3>
              <ul className="ml-6 list-disc text-gray-600 space-y-2">
                <li>全テナントの売上データをCSVファイルで出力</li>
                <li>出力されるデータ：年月、テナント名、売上金額</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-indigo-600" />
                データの修正・削除
              </h3>
              <ul className="ml-6 list-disc text-gray-600 space-y-2">
                <li>各テナントの売上データを修正可能</li>
                <li>不要なデータの削除が可能</li>
                <li>削除時は確認ダイアログが表示されます</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 共通機能 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600" />
            共通機能
          </h2>
          
          <div className="ml-8 space-y-4">
            <ul className="list-disc text-gray-600 space-y-2">
              <li>画面右上のログアウトボタンでログアウト</li>
              <li>入力項目の横にある「？」アイコンで説明を表示</li>
              <li>エラー時は赤字でメッセージを表示</li>
              <li>データの保存時は自動的にグラフや表に反映</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}