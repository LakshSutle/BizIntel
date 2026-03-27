import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { DashboardData } from '@/lib/types';

const resend = new Resend(process.env.RESEND_API_KEY);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function generateEmailHTML(data: DashboardData): string {
  const { inputs, snapshot, healthScore, recommendations, actionPlan, diagnosis } = data;
  
  const healthColor = healthScore.riskLevel === 'Low' ? '#22c55e' : 
                      healthScore.riskLevel === 'Medium' ? '#f59e0b' : '#ef4444';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BizIntel AI Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 40px 30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">BizIntel AI Report</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your Business Intelligence Analysis</p>
            </td>
          </tr>

          <!-- Business Info -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <span style="display: inline-block; background-color: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 6px; font-size: 14px; margin-right: 10px;">${inputs.business_type}</span>
                    <span style="display: inline-block; background-color: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 6px; font-size: 14px;">${inputs.location}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Health Score -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 25px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="100" valign="top">
                          <div style="width: 80px; height: 80px; background: ${healthColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 28px; font-weight: 700; line-height: 80px; text-align: center; display: block; width: 80px;">${healthScore.score}</span>
                          </div>
                        </td>
                        <td valign="top" style="padding-left: 20px;">
                          <h3 style="margin: 0 0 5px; color: #1e293b; font-size: 18px;">Business Health Score</h3>
                          <p style="margin: 0 0 10px; color: ${healthColor}; font-weight: 600; font-size: 14px;">${healthScore.riskLevel} Risk</p>
                          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">${diagnosis}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Financial Snapshot -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 15px; color: #1e293b; font-size: 18px; font-weight: 600;">Financial Snapshot</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-right: 10px;">
                    <div style="background-color: #f0fdf4; border-radius: 12px; padding: 20px; text-align: center;">
                      <p style="margin: 0 0 5px; color: #166534; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Revenue</p>
                      <p style="margin: 0; color: #166534; font-size: 24px; font-weight: 700;">${formatCurrency(snapshot.revenue)}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 10px;">
                    <div style="background-color: #fef2f2; border-radius: 12px; padding: 20px; text-align: center;">
                      <p style="margin: 0 0 5px; color: #991b1b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Expenses</p>
                      <p style="margin: 0; color: #991b1b; font-size: 24px; font-weight: 700;">${formatCurrency(snapshot.expenses)}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 15px;">
                    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 12px; padding: 20px; text-align: center;">
                      <p style="margin: 0 0 5px; color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Net Profit</p>
                      <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${formatCurrency(snapshot.profit)}</p>
                      <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">${snapshot.profitMargin.toFixed(1)}% Profit Margin</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Top Recommendations -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 15px; color: #1e293b; font-size: 18px; font-weight: 600;">Top Recommendations</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${recommendations.slice(0, 3).map((rec, i) => `
                <tr>
                  <td style="padding: 15px; background-color: #f8fafc; border-radius: 8px; margin-bottom: 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" valign="top">
                          <div style="width: 24px; height: 24px; background-color: #6366f1; border-radius: 50%; text-align: center; line-height: 24px; color: #ffffff; font-size: 12px; font-weight: 600;">${i + 1}</div>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0 0 4px; color: #1e293b; font-weight: 600; font-size: 14px;">${rec.title}</p>
                          <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.4;">${rec.description}</p>
                          <span style="display: inline-block; margin-top: 8px; padding: 3px 8px; background-color: ${rec.impact === 'High' ? '#dcfce7' : rec.impact === 'Medium' ? '#fef3c7' : '#f1f5f9'}; color: ${rec.impact === 'High' ? '#166534' : rec.impact === 'Medium' ? '#92400e' : '#475569'}; border-radius: 4px; font-size: 11px; font-weight: 500;">${rec.impact} Impact</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- Action Plan Preview -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 15px; color: #1e293b; font-size: 18px; font-weight: 600;">Action Plan Highlights</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${actionPlan.slice(0, 2).map(week => `
                <tr>
                  <td style="padding: 15px; border-left: 3px solid #6366f1; background-color: #f8fafc; margin-bottom: 10px;">
                    <p style="margin: 0 0 5px; color: #6366f1; font-weight: 600; font-size: 13px;">Week ${week.week}: ${week.title}</p>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">${week.focus}</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                `).join('')}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; text-align: center;">
                <p style="margin: 0 0 15px; color: #475569; font-size: 14px;">For the complete analysis with all charts and detailed insights, please see the attached PDF report.</p>
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">PDF report attached to this email</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 25px 40px; border-top: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">Generated by <strong style="color: #6366f1;">BizIntel AI</strong></p>
                    <p style="margin: 5px 0 0; color: #94a3b8; font-size: 12px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const { email, dashboardData } = await request.json();

    if (!email || !dashboardData) {
      return NextResponse.json(
        { error: 'Email and dashboard data are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please add RESEND_API_KEY.' },
        { status: 500 }
      );
    }

    const htmlContent = generateEmailHTML(dashboardData);

    const { data, error } = await resend.emails.send({
      from: 'BizIntel AI <onboarding@resend.dev>',
      to: email,
      subject: `Your BizIntel AI Report - ${dashboardData.inputs.business_type}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
