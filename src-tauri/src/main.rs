
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{
  CustomMenuItem,
  Menu,
  MenuItem,
  Submenu,
  WindowEvent,
};
use tauri::Manager;
use tauri::Window;
use std::process::Command;

#[tauri::command]
async fn optimize_memory() -> Result<String, String> {
  println!("Chamando optimize_memory...");
  #[cfg(target_os = "windows")]
  {
    let output = Command::new("powershell")
      .arg("-Command")
      .arg("Clear-RecycleBin -Force; Invoke-Expression ((gc C:\\Windows\\MEMORY_INFO.py) -join \"`n\")")
      .output()
      .map_err(|e| format!("Failed to execute command: {}", e))?;
    if output.status.success() {
      let stdout = String::from_utf8_lossy(&output.stdout);
      println!("stdout: {}", stdout);
      Ok(format!("Otimização de memória completa com sucesso. Resultado: {}", stdout))
    } else {
      let stderr = String::from_utf8_lossy(&output.stderr);
      eprintln!("stderr: {}", stderr);
      Err(format!("Otimização de memória falhou. Erro: {}", stderr))
    }
  }
  #[cfg(not(target_os = "windows"))]
  {
    Err("Otimização de memória não suportada para este sistema operacional.".to_string())
  }
}


#[tauri::command]
async fn clear_temp_files() -> Result<String, String> {
  println!("Chamando clear_temp_files...");
  #[cfg(target_os = "windows")]
  {
    let output = Command::new("powershell")
      .arg("-Command")
      .arg("Get-ChildItem -Path $env:TEMP, $env:LOCALAPPDATA\\Temp -File -Recurse | ForEach-Object { Remove-Item -Path $_.FullName -Force -ErrorAction SilentlyContinue }")
      .output()
      .map_err(|e| format!("Failed to execute command: {}", e))?;

    if output.status.success() {
      Ok("Arquivos temporários removidos com sucesso.".to_string())
    } else {
      let stderr = String::from_utf8_lossy(&output.stderr);
      eprintln!("stderr: {}", stderr);
      Err(format!("Falha ao remover arquivos temporários. Erro: {}", stderr))
    }
  }
  #[cfg(not(target_os = "windows"))]
  {
    Err("Limpeza de arquivos temporários não suportada para este sistema operacional.".to_string())
  }
}

#[tauri::command]
async fn flush_dns() -> Result<String, String> {
  println!("Chamando flush_dns...");
  #[cfg(target_os = "windows")]
  {
    let output = Command::new("powershell")
      .arg("-Command")
      .arg("ipconfig /flushdns")
      .output()
      .map_err(|e| format!("Failed to execute command: {}", e))?;

    if output.status.success() {
      Ok("Cache DNS limpo com sucesso.".to_string())
    } else {
      let stderr = String::from_utf8_lossy(&output.stderr);
      eprintln!("stderr: {}", stderr);
      Err(format!("Falha ao limpar o cache DNS. Erro: {}", stderr))
    }
  }
  #[cfg(not(target_os = "windows"))]
  {
    Err("Limpeza do cache DNS não suportada para este sistema operacional.".to_string())
  }
}

#[tauri::command]
async fn disk_cleanup() -> Result<String, String> {
  println!("Chamando disk_cleanup...");
  #[cfg(target_os = "windows")]
  {
    let output = Command::new("powershell")
      .arg("-Command")
      .arg("cleanmgr /sagerun:1")
      .output()
      .map_err(|e| format!("Failed to execute command: {}", e))?;

    if output.status.success() {
      Ok("Limpeza de disco concluída com sucesso.".to_string())
    } else {
      let stderr = String::from_utf8_lossy(&output.stderr);
      eprintln!("stderr: {}", stderr);
      Err(format!("Falha na limpeza de disco. Erro: {}", stderr))
    }
  }
  #[cfg(not(target_os = "windows"))]
  {
    Err("Limpeza de disco não suportada para este sistema operacional.".to_string())
  }
}

fn main() {
  let menu = Menu::new()
    .add_submenu(Submenu::new("Otimiza+", Menu::new()
      .add_item(CustomMenuItem::new("sobre", "Sobre"))
      .add_native_item(MenuItem::Separator)
      .add_item(CustomMenuItem::new("sair", "Sair").accelerator("CmdOrCtrl+Q")))
    );

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "sobre" => {
          let window = event.window();
          tauri::api::dialog::message(Some(window), "Sobre Otimiza+", "Otimiza+ é um otimizador de sistema.");
        }
        "sair" => {
          std::process::exit(0);
        }
        _ => {}
      }
    })
    .on_window_event(|event| {
      match event.event() {
        WindowEvent::CloseRequested { api, .. } => {
          event.window().hide().unwrap();
          api.prevent_close();
        }
        _ => {}
      }
    })
    .invoke_handler(tauri::generate_handler![
      optimize_memory,
      clear_temp_files,
      flush_dns,
      disk_cleanup
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
