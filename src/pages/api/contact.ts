import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const email = data.get('email') as string;
  const subject = data.get('subject') as string;
  const message = data.get('message') as string;

  if (!email || !subject || !message) {
    return new Response(JSON.stringify({ error: 'すべての項目を入力してください' }), { status: 400 });
  }

  try {
    sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

    const msg = {
      to: import.meta.env.GMAIL_USER,
      from: import.meta.env.GMAIL_USER, // 以前のonboarding@resend.devの代わりに、認証済みの送信元メールアドレスを設定してください。
      subject: `ウェブサイトからのお問い合わせ: ${subject}`,
      html: `
        <p><strong>送信元メールアドレス:</strong> ${email}</p>
        <p><strong>内容:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    await sgMail.send(msg);

    console.log('メール送信に成功しました！');
    return redirect('/contact-success');

  } catch (error) {
    console.error('メール送信に失敗しました:', error);
    return new Response(JSON.stringify({ error: 'メールの送信に失敗しました。' }), { status: 500 });
  }
};