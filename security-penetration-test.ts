#!/usr/bin/env tsx
/**
 * 🛡️ セキュリティペネトレーションテストスイート
 * 
 * 使用方法:
 * npx tsx security-penetration-test.ts
 * 
 * ⚠️ 警告: 本番環境では絶対に実行しないでください
 */

import { createClient } from '@supabase/supabase-js'

interface TestConfig {
  supabaseUrl: string
  anonKey: string
  testUserEmail?: string
  testUserPassword?: string
}

interface TestResult {
  testName: string
  passed: boolean
  details: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

class SecurityPenetrationTester {
  private config: TestConfig
  private supabase: any
  private results: TestResult[] = []

  constructor(config: TestConfig) {
    this.config = config
    this.supabase = createClient(config.supabaseUrl, config.anonKey)
  }

  private addResult(
    testName: string, 
    passed: boolean, 
    details: string, 
    severity: TestResult['severity'] = 'medium'
  ) {
    this.results.push({ testName, passed, details, severity })
    
    const icon = passed ? '✅' : '❌'
    const severityIcon = {
      low: '🟡',
      medium: '🟠', 
      high: '🔴',
      critical: '🚨'
    }[severity]
    
    console.log(`${icon} ${severityIcon} ${testName}: ${details}`)
  }

  // 🔍 テスト1: anon key による users テーブルアクセス試行
  async testAnonKeyUserAccess() {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .limit(10)

      if (!error && data && data.length > 0) {
        this.addResult(
          'Anon Key User Access',
          false,
          `CRITICAL: anon key can access ${data.length} user records. PII EXPOSED!`,
          'critical'
        )
        console.log('🚨 LEAKED DATA SAMPLE:', data.slice(0, 2))
      } else {
        this.addResult(
          'Anon Key User Access',
          true,
          'anon key properly blocked from users table',
          'high'
        )
      }
    } catch (err) {
      this.addResult(
        'Anon Key User Access',
        true,
        'anon key access properly restricted (exception thrown)',
        'high'
      )
    }
  }

  // 🔍 テスト2: 大量データ取得試行
  async testMassDataExtraction() {
    const tables = ['users', 'accounts', 'sessions', 'clients', 'campaigns', 'budgets', 'results']
    
    for (const table of tables) {
      try {
        const { data, error } = await this.supabase
          .from(table)
          .select('*')
          .limit(1000)

        if (!error && data && data.length > 30) {
          this.addResult(
            `Mass Data Extraction - ${table}`,
            false,
            `WARNING: Can extract ${data.length} records from ${table}`,
            table === 'users' ? 'critical' : 'high'
          )
        } else {
          this.addResult(
            `Mass Data Extraction - ${table}`,
            true,
            `${table} table properly protected (${data?.length || 0} records accessible)`,
            'low'
          )
        }
      } catch (err) {
        this.addResult(
          `Mass Data Extraction - ${table}`,
          true,
          `${table} table access blocked`,
          'low'
        )
      }
    }
  }

  // 🔍 テスト3: PII フィールド特定試行
  async testPIIFieldAccess() {
    const piiTests = [
      { table: 'users', fields: ['email', 'name', 'password'] },
      { table: 'accounts', fields: ['access_token', 'refresh_token', 'id_token'] },
      { table: 'sessions', fields: ['session_token'] },
    ]

    for (const test of piiTests) {
      try {
        const { data, error } = await this.supabase
          .from(test.table)
          .select(test.fields.join(','))
          .limit(5)

        if (!error && data && data.length > 0) {
          const exposedFields = test.fields.filter(field => 
            data.some((record: any) => record[field] != null)
          )
          
          if (exposedFields.length > 0) {
            this.addResult(
              `PII Field Access - ${test.table}`,
              false,
              `CRITICAL: PII fields exposed: ${exposedFields.join(', ')}`,
              'critical'
            )
            console.log(`🚨 EXPOSED PII in ${test.table}:`, exposedFields)
          } else {
            this.addResult(
              `PII Field Access - ${test.table}`,
              true,
              `PII fields properly protected in ${test.table}`,
              'medium'
            )
          }
        } else {
          this.addResult(
            `PII Field Access - ${test.table}`,
            true,
            `${test.table} PII access properly blocked`,
            'medium'
          )
        }
      } catch (err) {
        this.addResult(
          `PII Field Access - ${test.table}`,
          true,
          `${test.table} PII access blocked by exception`,
          'medium'
        )
      }
    }
  }

  // 🔍 テスト4: 権限昇格試行
  async testPrivilegeEscalation() {
    try {
      // users テーブルへの書き込み試行
      const { data, error } = await this.supabase
        .from('users')
        .insert({
          email: 'hacker@evil.com',
          name: 'Hacker User',
          role: 'admin',
          password: 'hacked123'
        })

      if (!error && data) {
        this.addResult(
          'Privilege Escalation - User Creation',
          false,
          'CRITICAL: anon key can create admin users!',
          'critical'
        )
      } else {
        this.addResult(
          'Privilege Escalation - User Creation',
          true,
          'User creation properly blocked',
          'high'
        )
      }
    } catch (err) {
      this.addResult(
        'Privilege Escalation - User Creation',
        true,
        'User creation blocked by exception',
        'high'
      )
    }

    try {
      // 既存ユーザーの役割変更試行
      const { data, error } = await this.supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('role', 'member')

      if (!error && data) {
        this.addResult(
          'Privilege Escalation - Role Update',
          false,
          'CRITICAL: anon key can escalate user privileges!',
          'critical'
        )
      } else {
        this.addResult(
          'Privilege Escalation - Role Update',
          true,
          'Role escalation properly blocked',
          'high'
        )
      }
    } catch (err) {
      this.addResult(
        'Privilege Escalation - Role Update',
        true,
        'Role escalation blocked by exception',
        'high'
      )
    }
  }

  // 🔍 テスト5: セッションハイジャック試行
  async testSessionManipulation() {
    try {
      const { data, error } = await this.supabase
        .from('sessions')
        .select('session_token, user_id')
        .limit(5)

      if (!error && data && data.length > 0) {
        this.addResult(
          'Session Token Access',
          false,
          `CRITICAL: Can access ${data.length} session tokens!`,
          'critical'
        )
        
        // セッション更新試行
        try {
          const { data: updateData, error: updateError } = await this.supabase
            .from('sessions')
            .update({ expires: new Date(Date.now() + 86400000).toISOString() })
            .eq('id', data[0].id)

          if (!updateError) {
            this.addResult(
              'Session Manipulation',
              false,
              'CRITICAL: Can manipulate session expiration!',
              'critical'
            )
          }
        } catch (err) {
          this.addResult(
            'Session Manipulation',
            true,
            'Session manipulation blocked',
            'medium'
          )
        }
      } else {
        this.addResult(
          'Session Token Access',
          true,
          'Session tokens properly protected',
          'high'
        )
      }
    } catch (err) {
      this.addResult(
        'Session Token Access',
        true,
        'Session access blocked by exception',
        'high'
      )
    }
  }

  // 🔍 テスト6: SQL インジェクション試行
  async testSQLInjection() {
    const injectionPayloads = [
      "' OR '1'='1",
      "'; DROP TABLE users; --",
      "' UNION SELECT * FROM users --",
      "admin'--",
      "' OR 1=1#"
    ]

    for (const payload of injectionPayloads) {
      try {
        const { data, error } = await this.supabase
          .from('users')
          .select('*')
          .eq('email', payload)

        if (!error && data && data.length > 0) {
          this.addResult(
            `SQL Injection - ${payload.substring(0, 20)}...`,
            false,
            'CRITICAL: SQL injection successful!',
            'critical'
          )
        } else {
          this.addResult(
            `SQL Injection - ${payload.substring(0, 20)}...`,
            true,
            'SQL injection properly blocked',
            'low'
          )
        }
      } catch (err) {
        this.addResult(
          `SQL Injection - ${payload.substring(0, 20)}...`,
          true,
          'SQL injection blocked by exception',
          'low'
        )
      }
    }
  }

  // 📊 テスト実行とレポート生成
  async runAllTests() {
    console.log('🔍 Starting Security Penetration Testing...')
    console.log('⚠️  WARNING: Running security tests - do NOT run in production!')
    console.log('=' .repeat(80))

    await this.testAnonKeyUserAccess()
    await this.testMassDataExtraction()
    await this.testPIIFieldAccess()
    await this.testPrivilegeEscalation()
    await this.testSessionManipulation()
    await this.testSQLInjection()

    console.log('=' .repeat(80))
    this.generateReport()
  }

  private generateReport() {
    const totalTests = this.results.length
    const passedTests = this.results.filter(r => r.passed).length
    const failedTests = totalTests - passedTests

    const severityCounts = {
      critical: this.results.filter(r => !r.passed && r.severity === 'critical').length,
      high: this.results.filter(r => !r.passed && r.severity === 'high').length,
      medium: this.results.filter(r => !r.passed && r.severity === 'medium').length,
      low: this.results.filter(r => !r.passed && r.severity === 'low').length,
    }

    console.log('\n📊 SECURITY PENETRATION TEST REPORT')
    console.log('=' .repeat(50))
    console.log(`Total Tests: ${totalTests}`)
    console.log(`✅ Passed: ${passedTests}`)
    console.log(`❌ Failed: ${failedTests}`)
    console.log('')
    console.log('🚨 Security Issues by Severity:')
    console.log(`  🚨 Critical: ${severityCounts.critical}`)
    console.log(`  🔴 High: ${severityCounts.high}`)
    console.log(`  🟠 Medium: ${severityCounts.medium}`)
    console.log(`  🟡 Low: ${severityCounts.low}`)

    if (severityCounts.critical > 0) {
      console.log('\n🚨 CRITICAL SECURITY ISSUES DETECTED!')
      console.log('🛑 DO NOT DEPLOY TO PRODUCTION!')
      console.log('🔧 Fix all critical issues before proceeding.')
    } else if (severityCounts.high > 0) {
      console.log('\n⚠️  High severity issues detected.')
      console.log('🔧 Recommend fixing before production deployment.')
    } else {
      console.log('\n✅ No critical or high severity issues detected.')
      console.log('🚀 Security posture appears acceptable for deployment.')
    }

    // 詳細レポートをファイルに出力
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        passedTests,
        failedTests,
        severityCounts
      },
      results: this.results
    }

    console.log('\n📝 Detailed report saved to: security-test-report.json')
    
    if (typeof require !== 'undefined') {
      const fs = require('fs')
      fs.writeFileSync(
        'security-test-report.json',
        JSON.stringify(reportData, null, 2)
      )
    }
  }
}

// 🚀 メイン実行
async function main() {
  const config: TestConfig = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  }

  if (!config.supabaseUrl || !config.anonKey) {
    console.error('❌ Missing Supabase configuration. Please set environment variables:')
    console.error('  NEXT_PUBLIC_SUPABASE_URL')
    console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const tester = new SecurityPenetrationTester(config)
  await tester.runAllTests()
}

// 実行時チェック
if (process.env.NODE_ENV === 'production') {
  console.error('🛑 SECURITY TEST BLOCKED: Cannot run in production environment!')
  process.exit(1)
}

if (require.main === module) {
  main().catch(console.error)
}

export { SecurityPenetrationTester } 